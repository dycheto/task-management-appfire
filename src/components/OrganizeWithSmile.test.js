import { describe } from "@jest/globals"
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import OrganizeWithSmile from "./OrganizeWithSmile";

describe("OrganizeWithSmile component test suit", () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
                <OrganizeWithSmile />
            </BrowserRouter>
        )
    })

    test('renders the whole login container', () => {
        const organizeWithSmile = screen.getByTestId("smile-container");
        expect(organizeWithSmile).not.toBeNull();
        expect(screen.findByAltText("smile-img")).not.toBeNull();
    });

})

