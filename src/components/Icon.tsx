import type { IconBaseProps } from 'react-icons'
import {
	FaArrowRightFromBracket,
	FaArrowRightToBracket,
	FaBars,
	FaBell,
	FaCheck,
	FaEnvelope,
	FaGoogle,
	FaKey,
	FaMagnifyingGlass,
	FaPlus,
	FaRegCircleXmark,
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
	add: FaPlus,
	success: FaCheck,
	error: FaRegCircleXmark,
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
