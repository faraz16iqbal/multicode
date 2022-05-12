/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { Controlled as CodeMirror } from "react-codemirror2";
import { FiShare2 } from "react-icons/fi";
import { Store } from 'react-notifications-component';
import { useLocation } from "react-router-dom";

// Components
import Header from "../../components/Header/Header";
import UsersList from "../../components/UsersList/UsersList";

// The following imports is for the theme.
import "codemirror/lib/codemirror.css";

// Themes
import "codemirror/theme/material.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/nord.css";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/eclipse.css";

// Languages
// LAZY LOAD THESE IMPORTS
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import "codemirror/mode/css/css";
import "codemirror/mode/python/python";
import "codemirror/mode/php/php";
import "codemirror/mode/vue/vue";

// Overrides some codemirror classes, don't change order
import "./Editor.scss";
import ControlDropdown from "../../components/ControlDropdown/ControlDropdown";

import socket from '../../utils/socket';
import { UserInterface, ConfigInterface } from "../../interfaces";
import { modes, themes } from '../../utils/data'
import Backdrop from "../../components/Backdrop/Backdrop";



const Editor: React.FC = () => {
    const params = useLocation();
    const [name, setName] = useState<string>("");
    const [formName, setFormName] = useState<string>("");
    const [room, setRoom] = useState<string>("");
    const [users, setUsers] = useState<Array<UserInterface>>([]);
    const [text, setText] = useState<string>("<h1>Welcome to MultiCode</h1>");
    const [modal, setModal] = useState<boolean>(true);

    const [config, setConfig] = useState<ConfigInterface>({
        mode: { name: "xml" },
        theme: "material",
        lineNumbers: true,
    });

    const ENDPOINT = "http://localhost:5000";

    useEffect(() => {

        const { room }: any = queryString.parse(params.search)
        setRoom(room);


    }, [ENDPOINT, params.search]);

    // Socket.io listeners
    useEffect(() => {
        socket.on("text", (text) => {
            setText(text);
        });

        socket.on("notification", (notification) => {
            if (notification.type === "connect") {
                Store.addNotification({
                    message: notification.text,
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true,
                        pauseOnHover: true,
                        touch: true,
                        showIcon: true,
                        click: true,
                    },
                });
            } else {
                Store.addNotification({
                    message: notification.text,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true,
                        pauseOnHover: true,
                        touch: true,
                        showIcon: true,
                        click: true,
                    },
                });
            }
        });

        socket.on("changeMode", (name: string) => {
            setConfig(prevState => ({ ...prevState, mode: { name } }));
        });

        socket.on("changeTheme", (theme, prevState) => {
            setConfig(prevState => ({ ...prevState, theme: theme }));
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, []);

    const handleNameSubmit = (e: any) => {
        e.preventDefault();
        if (formName) {
            setName(formName);
            socket.emit("join", { name: formName, room }, (error: any) => {
                if (error) {
                    alert(error);
                } else {
                    setModal(false);
                }
            });

        }

    }
    const handleNameChange = (e: any) => {
        setFormName(e.target.value);

    }
    const handleChange = (value: string) => {
        socket.emit("sendText", value);
    };

    const handleMode = (e: { target: HTMLInputElement }) => {
        setConfig(prevState => ({ ...prevState, mode: { name: e.target.value } }));
        socket.emit("sendModeValue", e.target.value);
    };

    const handleTheme = (e: { target: HTMLInputElement }) => {
        setConfig(prevState => ({ ...prevState, theme: e.target.value }));
        socket.emit("sendThemeValue", e.target.value);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        Store.addNotification({
            message: "Copied shareable link to clipboard!",
            type: "info",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true,
                pauseOnHover: true,
                touch: true,
                showIcon: true,
                click: true,
            },
        });
    };



    return (
        <>
            <Backdrop handleNameSubmit={handleNameSubmit} handleNameChange={handleNameChange} show={modal} />
            <div className="codebox-container">
                <Header />
                <UsersList users={users} />
                <main>
                    <div className="controls">
                        <ControlDropdown
                            default={config.mode}
                            options={modes}
                            handleDropdown={handleMode}
                        />
                        <div onClick={handleShare} className="control-icon">
                            <span>Share&nbsp;&nbsp;</span>
                            <FiShare2 size={15} />
                        </div>
                        <ControlDropdown
                            default={config.mode}
                            options={themes}
                            handleDropdown={handleTheme}
                        />
                    </div>
                    <CodeMirror
                        value={text}
                        className="code-editor"
                        options={config}
                        onBeforeChange={(editor, data, value) => {
                            setText(value);
                            handleChange(value);
                        }}
                    />
                </main>
            </div>
        </>
    );
}

export default Editor;
