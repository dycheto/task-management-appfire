import { describe } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Button from "./Button";

describe("Button test suit", () => {


    function handleAddTask() {
        let showModal = true;
        return showModal;
    }

    beforeEach(() => {
        render(
            <BrowserRouter>
                <Button
                    className={"add-task category-button"}
                    title="Add new task"
                    handleClick={handleAddTask}
                />
            </BrowserRouter>
        )
    })

    test('Button the whole login container', () => {
        const buttonContainer = screen.getByTestId("button-container");
        expect(buttonContainer).not.toBeNull();
        expect(screen.findByText("Add new task")).not.toBeNull();
    });

    test('at add new task click', () => {
        const addTaskBtn = screen.getByTestId('button-container');
        fireEvent.click(addTaskBtn);
    });

    test('at add new task click', () => {
        const addTaskBtn = screen.getByTestId('button-container');
        fireEvent.click(addTaskBtn);
    });

})

