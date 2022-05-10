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

// get scoket
import socket from '../../utils/socket';
import { UserInterface } from "../../interfaces";

type Config = {
    mode: { name: String },
    theme: String,
    lineNumbers: Boolean
};

const Editor: React.FC = () => {
    const params = useLocation();
    const [name, setName] = useState<String>("");
    const [room, setRoom] = useState<String>("");
    const [users, setUsers] = useState<Array<UserInterface>>([]);
    const [text, setText] = useState<string>("<h1>Welcome to CodeRigade</h1>");
    const [config, setConfig] = useState<Config>({
        mode: { name: "xml" },
        theme: "material",
        lineNumbers: true,
    });

    const ENDPOINT = "http://localhost:5000";

    useEffect(() => {

        const { room }: any = queryString.parse(params.search)


        let name: String | null = null;
        while (!name) {
            name = prompt("Hi, What is your name?");
        }

        setName(name);
        setRoom(room);

        socket.emit("join", { name, room }, (error: any) => {
            if (error) {
                alert(error);
            }
        });
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

        socket.on("changeMode", (name: String) => {
            setConfig(prevState => ({ ...prevState, mode: { name } }));
        });

        socket.on("changeTheme", (theme, prevState) => {
            setConfig(prevState => ({ ...prevState, theme: theme }));
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
            console.log(users);
        });
    }, []);

    const handleChange = (value: String) => {
        socket.emit("sendText", value);
    };

    const handleMode = (e: { target: HTMLInputElement }) => {
        // const newValue: String = (<e.target as HTMLInputElement).value;
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

    const modes = [
        { name: "XML/HTML", code: "xml" },
        { name: "CSS", code: "css" },
        { name: "Javascript", code: "javascript" },
        { name: "C/C++/C#", code: "clike" },
        { name: "Python", code: "python" },
        { name: "PHP", code: "php" },
        { name: "Vue", code: "vue" },
    ];

    const themes = [
        { name: "Material", code: "material" },
        { name: "Monokai", code: "monokai" },
        { name: "Nord", code: "nord" },
        { name: "Ambiance", code: "ambiance" },
        { name: "Eclipse", code: "eclipse" },
    ];

    return (
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
    );
}

export default Editor;
