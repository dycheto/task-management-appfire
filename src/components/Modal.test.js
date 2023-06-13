import { describe } from "@jest/globals"
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Modal from "./Modal";

describe("Modal test suit", () => {
    const task = {
        title: "title",
        description: "description",
        taskId: "taskId",
        timestamp: "timestamp",
        category: "Daily-task"
    }

    function setNewTask() {

    }
    let showModal = true

    function handleModalClose() {
        showModal = false
    }
    function handleModalSubmit() {

    }

    beforeEach(() => {
        render(
            <BrowserRouter>
                <Modal
                    showModal={showModal}
                    editMode={false}
                    task={task}
                    handleModalClose={handleModalClose}
                    handleModalSubmit={handleModalSubmit}
                    newTask={
                        {
                            title: "title",
                            description: "Description",
                            taskId: "123",
                            timestamp: "10.10.10",
                            category: "Daily-task"
                        }}
                />
            </BrowserRouter>
        )
    })

    test('renders the whole modal container', () => {
        const moodalContainer = screen.getByTestId("modal-container");
        expect(moodalContainer).not.toBeNull();
        expect(screen.findByAltText("Title")).not.toBeNull();
        expect(screen.getByText(/title/i)).toBeInTheDocument();
    });

    test('test handle cancel button', ()=>{

        const cancelButton = screen.getByTestId('modal-cancel-btn');
        fireEvent.click(cancelButton);
        expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    })

})

