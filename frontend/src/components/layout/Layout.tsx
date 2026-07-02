import { Header } from './header/Header'
import styles from './Layout.module.css'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
    </>
  )
}