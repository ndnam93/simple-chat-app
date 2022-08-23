import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
  ConversationHeader,
  TypingIndicator,
  MessageSeparator,
  StarButton
} from '@chatscope/chat-ui-kit-react'
import { useState } from 'react'
import { LogoutButton } from '../components/LogoutButton'
import { useAuth } from '../providers/AuthProvider'

function Chat() {
  const { onLogout, user } = useAuth()
  const [messageInputValue, setMessageInputValue] = useState('')

  return (
    <MainContainer responsive className="h-screen">
      <Sidebar position="left" scrollable={false}>
        <ConversationHeader>
          <Avatar name="Nam" />
          <ConversationHeader.Content userName={user.name} />
          <ConversationHeader.Actions>
            <LogoutButton onClick={onLogout} />
          </ConversationHeader.Actions>
        </ConversationHeader>
        <Search placeholder="Search..." />
        <ConversationList>
          <Conversation
            name="Lilly"
            lastSenderName="Lilly"
            info="Yes i can do it for you"
          >
            <Avatar name="Lilly" status="available" />
          </Conversation>

          <Conversation
            name="Joe"
            lastSenderName="Joe"
            info="Yes i can do it for you"
          >
            <Avatar name="Joe" status="dnd" />
          </Conversation>

          <Conversation
            name="Emily"
            lastSenderName="Emily"
            info="Yes i can do it for you"
            unreadCnt={3}
          >
            <Avatar name="Emily" status="available" />
          </Conversation>

          <Conversation
            name="Kai"
            lastSenderName="Kai"
            info="Yes i can do it for you"
            unreadDot
          >
            <Avatar name="Kai" status="unavailable" />
          </Conversation>
        </ConversationList>
      </Sidebar>

      <ChatContainer>
        <ConversationHeader>
          <ConversationHeader.Back />
          <Avatar name="Zoe" />
          <ConversationHeader.Content userName="Zoe" />
        </ConversationHeader>
        <MessageList
          typingIndicator={<TypingIndicator content="Zoe is typing" />}
        >
          <Message
            model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Zoe',
              direction: 'incoming',
              position: 'single'
            }}
          >
            <Avatar name="Zoe" />
          </Message>
          <Message
            model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Patrik',
              direction: 'outgoing',
              position: 'single'
            }}
          />
          <Message
            model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Zoe',
              direction: 'incoming',
              position: 'first'
            }}
            avatarSpacer
          />
          <Message
            model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Zoe',
              direction: 'incoming',
              position: 'normal'
            }}
            avatarSpacer
          />
          <Message
            model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Zoe',
              direction: 'incoming',
              position: 'last'
            }}
          >
            <Avatar name="Zoe" />
          </Message>
          <Message
            model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Patrik',
              direction: 'outgoing',
              position: 'first'
            }}
          />
          <Message
            model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Patrik',
              direction: 'outgoing',
              position: 'normal'
            }}
          />
          <Message
            model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Patrik',
              direction: 'outgoing',
              position: 'last'
            }}
          />

          <Message
            model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Zoe',
              direction: 'incoming',
              position: 'first'
            }}
            avatarSpacer
          />
          <Message
            model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Zoe',
              direction: 'incoming',
              position: 'last'
            }}
          >
            <Avatar name="Zoe" />
          </Message>
        </MessageList>
        <MessageInput
          placeholder="Type message here"
          value={messageInputValue}
          onChange={(val) => setMessageInputValue(val)}
        />
      </ChatContainer>
    </MainContainer>
  )
}

export default Chat
