import { describe } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";

describe("Footer test suit", () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        )
    })

    test('renders the whole login container', () => {
        const footerContainer = screen.getByTestId("footer-test-container");
        expect(footerContainer).not.toBeNull();
        expect(screen.findByAltText("Developed by ")).not.toBeNull();
        expect(screen.findByAltText("Tihomir Dukov")).not.toBeNull();
    });

})

