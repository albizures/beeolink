import type { IconBaseProps } from 'react-icons'
import {
	FaArrowRightFromBracket,
	FaArrowRightToBracket,
	FaBars,
	FaBell,
	FaEnvelope,
	FaGoogle,
	FaKey,
	FaMagnifyingGlass,
	FaUser,
} from 'react-icons/fa6'

const icons = {
	email: FaEnvelope,
	profile: FaUser,
	password: FaKey,
	menu: FaBars,
	search: FaMagnifyingGlass,
	bell: FaBell,
	signIn: FaArrowRightToBracket,
	signOut: FaArrowRightFromBracket,
	google: FaGoogle,
} as const

type IconNames = keyof typeof icons

type IconProps = IconBaseProps & {
	name: IconNames
}

export function Icon(props: IconProps) {
	const { name } = props
	const Icon = icons[name]

	return <Icon {...props} />
}
