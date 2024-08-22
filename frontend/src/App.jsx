import React, { useState, useEffect } from 'react';

const App = () => {
    const [applications, setApplications] = useState([]);
    const [appPath, setAppPath] = useState('');
    const [parameter, setParameter] = useState('');

    useEffect(() => {
        // Fetch the list of applications from the backend
        fetch('/applications')
            .then((res) => res.json())
            .then((data) => setApplications(data));
    }, []);

    const launchApplication = () => {
        fetch('/launch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ application: appPath, parameter }),
        })
            .then((res) => res.json())
            .then((data) => alert(data.message))
            .catch((err) => alert('Error launching application'));
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.heading}>Application Launcher</h1>
                <ul style={styles.appList}>
                    {applications.map((app, index) => (
                        <li key={index} style={styles.appListItem}>{app.name}</li>
                    ))}
                </ul>
                <input
                    type="text"
                    placeholder="Application Path"
                    value={appPath}
                    onChange={(e) => setAppPath(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Parameter"
                    value={parameter}
                    onChange={(e) => setParameter(e.target.value)}
                    style={styles.input}
                />
                <button onClick={launchApplication} style={styles.button}>Launch</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',            // Ensure the container takes the full width of the viewport
        backgroundColor: '#f5f5f5',
        padding: '20px',
        boxSizing: 'border-box',
    },
    content: {
        maxWidth: '400px',
        width: '100%',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    heading: {
        marginBottom: '20px',
    },
    appList: {
        listStyleType: 'none',
        padding: 0,
        marginBottom: '20px',
    },
    appListItem: {
        marginBottom: '10px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default App;
