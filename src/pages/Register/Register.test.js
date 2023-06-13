import { describe } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react";
import { PureRegister } from "./Register";
import { BrowserRouter } from "react-router-dom";

describe("Register test suit", () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
                <PureRegister />
            </BrowserRouter>
        )
    })


    test('renders the whole register container', () => {
        const registerContainer = screen.getByTestId("register-container");
        expect(registerContainer).not.toBeNull();
        expect(screen.getByText("Register")).not.toBeNull();
        expect(screen.getByText("Sign up")).not.toBeNull();
        expect(screen.getByText("Register")).not.toBeNull();
    });
})