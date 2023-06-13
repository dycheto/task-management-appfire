import { describe } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

describe("Header test suit", () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )
    })

    test('renders the whole login container', () => {
        const headerContainer = screen.getByTestId("header-container");
        expect(headerContainer).not.toBeNull();
        expect(screen.findByAltText("logo-img")).not.toBeNull();
        expect(screen.findByAltText(/Logout/i)).not.toBeNull();
        expect(screen.findByAltText("Welcome,")).not.toBeNull();
    });

    test('tests onLogout click', () => {
        
    })
})

