import styles from '/public/Login.module.css'


export function LoginMain(){
    return (
        <>
            <div className={styles.loginContainer}>
                <form method='post' action='/signin' className={styles.loginForm}>
                    <h2>Login</h2>
                    <input type="text" placeholder="Username" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}