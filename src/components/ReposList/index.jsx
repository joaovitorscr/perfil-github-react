import { useEffect, useState } from "react";

import styles from './ReposList.module.css'

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true)

    useEffect(() => {
        setEstaCarregando(true);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
        .then(res => res.json())
        .then(resJson => {
            setTimeout(() => {
                setEstaCarregando(false);
                setRepos(resJson);
            }, 2000);
        })
    }, [nomeUsuario])

    return (
        <div className="container">
            {estaCarregando ? (
                <h2 className={styles.loading}>Carregando...</h2>
            ) : (
                <ul className={styles.list}>
                {repos.map(({ id, name, language, html_url}) => (
                        <li className={styles.listItem} key={id}>
                            <div className={styles.itemName}>
                                <b className="nome">Nome:</b> {name}
                            </div>
                            <div className={styles.itemLanguage}>
                                <b className="linguagem">Linguagem:</b> {language}
                            </div>
                            <a className={styles.itemLink} target="_blank" href={html_url}>Visitar no Github</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ReposList;