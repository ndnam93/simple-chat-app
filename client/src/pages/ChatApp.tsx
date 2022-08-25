import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message as ChatMessage,
  MessageInput,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
  ConversationHeader,
  TypingIndicator,
  MessageSeparator
} from '@chatscope/chat-ui-kit-react'
import { useEffect, useRef, useState } from 'react'
import useFetch from 'use-http'
import _ from 'lodash'
import io from 'socket.io-client'

import { LogoutButton } from '../components/LogoutButton'
import { useAuth } from '../providers/AuthProvider'
import { User } from '../types/user'
import { Chat } from '../types/chat'
import { Message } from '../types/message'
import { useReferredState } from '../hooks/useReferredState'

const socket = io({ path: '/socket' }, { autoConnect: false })

function ChatApp() {
  const { onLogout, user: loggedInUser } = useAuth()
  const [searchValue, setSearchValue] = useState('')
  const [messageInputValue, setMessageInputValue] = useState('')
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [chat, chatRef, setChat] = useReferredState<Chat | undefined>(undefined)
  const [messages, messagesRef, setMessages] = useReferredState<Message[]>([])
  const [currentUser, setCurrentUser] = useState<User>()

  const { get: getUsers } = useFetch('/users')
  const chatRequest = useFetch('/chats')

  useEffect(
    _.debounce(() => {
      const params = new URLSearchParams()
      if (searchValue) {
        params.set('name', searchValue)
      }
      getUsers('?' + params.toString()).then((response) => {
        let { results = [] } = response
        results = results.filter((user: User) => user.id != loggedInUser.id)
        setAllUsers(results)
      })
    }, 1000),
    [searchValue]
  )

  useEffect(() => {
    allUsers.length && openChat(allUsers?.[0])
  }, [allUsers])

  useEffect(() => {
    socket.auth = { userId: loggedInUser.id }
    socket.connect()
    socket.on('connect', () => {
      console.log('socket connected')
    })
    socket.on('disconnect', () => {
      console.log('socket disconnected')
    })
    socket.on('NewMessage', (message) => {
      console.log('New message', message)
      const isInCurrentChat = message.chatId == chatRef.current?.id
      const isNotInList = !messagesRef.current?.find((m) => m.id == message.id)
      if (isInCurrentChat && isNotInList) {
        setMessages([...messagesRef.current, message])
      }
    })
    // socket.onAny((event, ...args) => {
    //   console.log(event, args);
    // })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('NewMessage')
      socket.disconnect()
    }
  }, [loggedInUser])

  const openChat = async (user: User) => {
    setCurrentUser(user)
    const chat = await chatRequest.get(`?ids[]=${user.id}`)
    console.log('open chat with', user, chat)
    setChat(chat)
    chatRequest.cache.clear()
    const messages = await chatRequest.get(chat.id + '/messages')
    setMessages(messages)
  }

  const sendMessage = async (html: string, message: string) => {
    await chatRequest.post(chat.id + '/messages', { message })
    setMessageInputValue('')
  }

  return (
    <MainContainer responsive className="h-screen">
      <Sidebar position="left" scrollable={false}>
        <ConversationHeader>
          <Avatar name={loggedInUser.name} src={loggedInUser.profile_pic} />
          <ConversationHeader.Content userName={loggedInUser.name} />
          <ConversationHeader.Actions>
            <LogoutButton onClick={onLogout} />
          </ConversationHeader.Actions>
        </ConversationHeader>
        <Search
          placeholder="Search..."
          value={searchValue}
          onChange={setSearchValue}
          onClearClick={() => setSearchValue('')}
        />
        <ConversationList>
          {allUsers.map((user: User) => (
            <Conversation
              key={user.id}
              name={user.name}
              onClick={() => openChat(user)}
              active={user.id == currentUser?.id}
              // lastSenderName="Lilly"
              // info="Yes i can do it for you"
            >
              <Avatar
                name={user.name}
                src={user.profile_pic}
                status="available"
              />
            </Conversation>
          ))}
        </ConversationList>
      </Sidebar>

      <ChatContainer>
        <ConversationHeader>
          <ConversationHeader.Back />
          <Avatar name={currentUser?.name} src={currentUser?.profile_pic} />
          <ConversationHeader.Content userName={currentUser?.name} />
        </ConversationHeader>
        <MessageList
        // typingIndicator={<TypingIndicator content="Zoe is typing" />}
        >
          {messages.map((message) => {
            const sender =
              message.sender === loggedInUser.id
                ? loggedInUser
                : (currentUser as User)
            return (
              <ChatMessage
                key={message.id}
                model={{
                  message: message.message,
                  sentTime: '15 mins ago',
                  sender: sender.name,
                  direction:
                    message.sender === loggedInUser.id
                      ? 'outgoing'
                      : 'incoming',
                  position: 'single'
                }}
              >
                <Avatar name={sender.name} src={sender.profile_pic} />
              </ChatMessage>
            )
          })}
        </MessageList>
        <MessageInput
          placeholder="Type message here"
          value={messageInputValue}
          onChange={(val) => setMessageInputValue(val)}
          onSend={sendMessage}
        />
      </ChatContainer>
    </MainContainer>
  )
}

export default ChatApp
