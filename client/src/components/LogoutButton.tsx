import { Button } from '@chatscope/chat-ui-kit-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt'

export function LogoutButton(props) {
  return (
    <Button
      {...props}
      icon={<FontAwesomeIcon icon={faSignOutAlt} />}
      title="Logout"
    />
  )
}
