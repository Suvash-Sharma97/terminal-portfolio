import React from 'react';
import "../App.css";

export default function Navigation(props) {
    const { name, root } = props;
    const heading = `${root}@${name}:~$ `;

    return (
        <div id="navbar">
            <span id="terminal-heading">{heading}</span>
            <div id="window-controls">
                <span><img src="/images/minimize.jpg" alt="img" /></span>
                <span><img src="/images/toggleMax.jpg" alt="toggle" /></span>
                <span><img src="/images/close.jpg" alt="close" /></span>
            </div>
        </div>
    );
}

Navigation.defaultProps = {
    "root": "root",
    "name": "anonymous"
};
