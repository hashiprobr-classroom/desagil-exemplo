// Não é necessário entender ou modificar este arquivo.

import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = false;
    }
    static getDerivedStateFromError() {
        return true;
    }
    render() {
        return this.state ? null : this.props.children;
    }
}

export { ErrorBoundary };
