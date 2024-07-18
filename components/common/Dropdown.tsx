import { FC } from "react"

type Props = {
    username: string
}

export const Dropdown: FC<Props> = ({username}: Props) => {
  return (
    <div>
        <select className="bg-neutral-900 text-white p-2">
            <option className="p-2" value={username}>{username}</option>
            <option className="p-2" value="Profile">Profile</option>
            <option className="p-2" value="Log out">Log Out</option>
        </select>
    </div>
  )
}
