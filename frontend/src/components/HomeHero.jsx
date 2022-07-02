import React from 'react'

function HomeHero() {
    return (
        <div className="px-4 py-5 my-5 text-center">
            <h1 className="display-5 fw bold">Gaijin Foodie</h1>
            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">
                    Want to find new and exotic places to eat?
                </p>
                <p>
                    You just found the right place! Checkout my collection of foreign restaurants in Tokyo!
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <button type="button" className="btn btn-primary btn-lg px-4 gap-3">
                        Enter
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-lg px-4">
                        Contact
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomeHero
