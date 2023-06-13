import { describe } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";

describe("ConfirmDialog test suit", () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
                <ConfirmDialog
                message={'it work'}
                onConfirm={true}
                onCancel={false}
                />
            </BrowserRouter>
        )
    })

    test('renders the whole confirm dialog container', () => {
        const confirmDialogContainer = screen.getByTestId("confirm-dialog-container");
        expect(confirmDialogContainer).not.toBeNull();
    });

})

