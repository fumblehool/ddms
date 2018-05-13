import React, { Component } from 'react';


class NotFound extends Component {
    render(){
        return (
            <div className="text-center not-found">
                <article>
                    <h1>It's a 404!</h1>
                    <div>
                        <a href="/docs/">Home</a>
                    </div>
                </article>
            </div>
        )
    }
}

export default NotFound;