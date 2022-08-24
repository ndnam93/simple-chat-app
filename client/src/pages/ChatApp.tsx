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
  MessageSeparator,
} from '@chatscope/chat-ui-kit-react'
import { useEffect, useState } from 'react'
import useFetch from 'use-http'
import _ from 'lodash'

import { LogoutButton } from '../components/LogoutButton'
import { useAuth } from '../providers/AuthProvider'
import { User } from '../types/user'
import { Chat } from '../types/chat'
import { Message } from '../types/message'

function ChatApp() {
  const { onLogout, user: loggedInUser } = useAuth()
  const [searchValue, setSearchValue] = useState('')
  const [messageInputValue, setMessageInputValue] = useState('')
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [chat, setChat] = useState<Chat>()
  const [currentUser, setCurrentUser] = useState<User>()
  const [messages, setMessages] = useState<Message[]>([])

  const { get: getUsers } = useFetch('/users')
  const { get: getChat } = useFetch('/chats')
  const { get: getMessages, post: postMessage } = useFetch('/chats')

  useEffect(_.debounce(() => {
    const params = new URLSearchParams();
    if (searchValue) {
      params.set('name', searchValue)
    }
    getUsers('?' + params.toString())
      .then(response => {
        let { results = [] } = response;
        results = results.filter((user: User) => user.id != loggedInUser.id)
        setAllUsers(results);
      })
  }, 1000), [searchValue])

  useEffect(() => {
    allUsers.length && openChat(allUsers?.[0])
  }, [allUsers])

  const openChat = async (user: User) => {
    console.log('open chat with', user)
    setCurrentUser(user)
    const chat = await getChat(`?ids[]=${user.id}`)
    setChat(chat)
    const messages = await getMessages(chat.id + '/messages')
    setMessages(messages)
  }

  const sendMessage = async (html: string, message: string) => {
    await postMessage(chat.id + '/messages', { message })
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
        <Search placeholder="Search..." value={searchValue} onChange={setSearchValue} onClearClick={() => setSearchValue("")} />
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
              <Avatar name={user.name} src={user.profile_pic} status="available" />
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
          {messages.map(message => {
            const sender = message.sender === loggedInUser.id ? loggedInUser : currentUser as User
            return (
              <ChatMessage
                model={{
                  message: message.message,
                  sentTime: '15 mins ago',
                  sender: sender.name,
                  direction: message.sender === loggedInUser.id ? 'outgoing' : 'incoming',
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
