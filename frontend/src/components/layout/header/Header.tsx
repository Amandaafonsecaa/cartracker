import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'
import Logo from '../../../assets/logo-cartracker.png'

interface HeaderProps {
    activeVehicle?: {
        nickname: string
        plate: string
    }
}


export function Header({ activeVehicle }: HeaderProps) {
    const navLinks = [
        { to: '/', label: 'Início', end: true },
        { to: '/refueling', label: 'Abastecer' },
        { to: '/expense', label: 'Gasto' },
        { to: '/history', label: 'Histórico' },
        { to: '/vehicles', label: 'Veículos' },
        ]

    return (
    <header className={styles.navbar}>
        <div className={styles.navLogo}>
            <img src={Logo} className={styles.logo} alt="" />
        </div>
        <div className={styles.navItems}>
           {navLinks.map(link => (
            <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
            >
                {link.label}
            </NavLink>
            ))}         
        </div>
        <div className={styles.navName}>
            <p>{activeVehicle ? `${activeVehicle.nickname} · ${activeVehicle.plate}` : 'Como está'}</p>
        </div>
    </header>      
    )
}
