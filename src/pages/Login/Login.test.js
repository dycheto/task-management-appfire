import { describe } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react";
import { PureLogin } from "./Login";
import { BrowserRouter } from "react-router-dom";

describe("Login test suit", () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
                <PureLogin />
            </BrowserRouter>
        )
    })
    
    test('renders the whole login container', () => {
        const loginContainer = screen.getByTestId("login-container");
        expect(loginContainer).not.toBeNull();
        expect(screen.getByText("Login")).not.toBeNull();
        expect(screen.getByText("Sign in")).not.toBeNull();
        expect(screen.getByText("Register")).not.toBeNull();
    });
})

