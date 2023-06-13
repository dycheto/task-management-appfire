import { describe } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PureMain } from "./Main";

describe("Main test suit", () => {



    beforeEach(() => {
        render(
            <BrowserRouter>
                <PureMain/>
            </BrowserRouter>
        )
    })

    test('renders the whole main container', () => {
        const mainContainer = screen.getByTestId("main-container");
        expect(mainContainer).not.toBeNull();
        expect(screen.getByText("Show all")).not.toBeNull();
        expect(screen.getByText("Daily tasks")).not.toBeNull();
        expect(screen.getByText("Weekly tasks")).not.toBeNull();
    });
})

