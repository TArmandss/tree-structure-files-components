import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
    const files = {
        children: [
            {
                name: 'node_modules',
                children: [
                    {
                        name: 'bin'
                    },
                    {
                        name: '@babel',
                        children: [
                            {
                                name: 'code-frame'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'package.json'
            },
            {
                name: 'public',
                children: [
                    {
                        name: 'assets',
                        children: [
                            {
                                name: 'img'
                            },
                            {
                                name: 'videos'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'components'
            }
        ]
    };

    // Define state for tracking expanded status of each entry
    const [expandedEntries, setExpandedEntries] = useState({});

    function toggleExpand(name) {
        setExpandedEntries(prevState => ({
            ...prevState,
            [name]: !prevState[name]
        }));
    }

    function Entry({ name, children, depth }) {
        const childrenArray = children || [];
        const isExpanded = expandedEntries[name]; // Check if this entry is expanded

        return (
            <div style={{ color: 'white', paddingLeft: `${depth * 10}px` }}>
                {/* Render a button to toggle expansion if there are children */}
                {childrenArray.length > 0 && (
                    <button onClick={() => toggleExpand(name)}>{isExpanded ? '-' : '+'}</button>
                )}
                {name}
                {isExpanded && (
                    <>
                        {childrenArray.map(child => (
                            <Entry key={child.name} {...child} depth={depth + 1} />
                        ))}
                    </>
                )}
            </div>
        );
    }

    return (
        <React.Fragment>
            {files.children.map(entry => (
                <Entry key={entry.name} {...entry} depth={1} />
            ))}
        </React.Fragment>
    );
}

export default App;
