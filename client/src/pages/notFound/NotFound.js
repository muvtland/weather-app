import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './notFound.module.css'


export default () => {
    const history = useHistory()
    const goHome = e => {
        e.preventDefault()
        history.push('/')
    }
    return (
        <>
            <div className={styles.mainbox}>
                <div className={styles.err}>404</div>
                <div className={styles.msg}>Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in
                    the first place?<p>Let's go <a href={'/#'} onClick={goHome}>home</a> and try from there.</p></div>
            </div>
        </>
    )
}