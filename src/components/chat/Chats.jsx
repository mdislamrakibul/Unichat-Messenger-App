
import React, { useState, useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../../firebase'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

function Chats() {

    const history = useHistory()
    const user = useAuth()

    const [loading, setLoading] = useState(true)

    console.log(user)
    console.log(user.uid)

    const handleLogout = async () => {
        await auth.signOut()
        history.push('/')
    }


    const getFile = async (url) => {
        const response = await fetch(url)
        const data = await response.blob()
        // console.log(response);
        // console.log(data);
        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })
    }

    useEffect(() => {
        if (!user) {
            history.push('/')
            return
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                'Project-ID': process.env.REACT_APP_CHAT_ENGINE_ID,
                'User-Name': user.displayName,
                'User-Secret': user.uid
            },
        }).then(() => {
            setLoading(false)
        }).catch(() => {
            let formData = new FormData()
            formData.append('email', user.email)
            formData.append('username', user.displayName)
            formData.append('secret', user.uid)
            formData.append('confirm_secret', user.uid)

            getFile(user.photoURL)
                .then((avatar) => {

                    // console.log(avatar);
                    // console.log(avatar.name);
                    formData.append('avatar', avatar, avatar.name)

                    axios.post('https://api.chatengine.io/users',
                        formData,
                        {
                            headers: {
                                "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY
                            }
                        }
                    )
                        .then(() => setLoading(false))
                        .catch((err) => console.log(err))
                })
        })

    }, [user, history])

    if (!user || loading) return 'Loading...'

    return (
        <div className="chats-page" >
            <div className="nav-bar">
                <div className="logo-tab">
                    Unichat
                </div>
                <div className="logout-tab"
                    onClick={handleLogout}
                >
                    Logout
                </div>
            </div>

            <ChatEngine
                height='100vh-66px'
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.displayName}
                userSecret={user.uid}
            />
        </div>
    );
}

export default Chats;