import { describe } from "@jest/globals"
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Task from "./Task";

describe("Task test suit", () => {
    const task = {
        title: "title",
        description: "description",
        taskId: "taskId",
        timestamp: "timestamp",
        category: "Daily-task"
    }


    beforeEach(() => {
        render(
            <BrowserRouter>
                <Task
                    task={task}
                />
            </BrowserRouter>
        )
    })

    test('renders the whole task container', () => {
        const taskContainer = screen.getByTestId("task-container");
        expect(taskContainer).not.toBeNull();
        expect(screen.findByAltText("Edit")).not.toBeNull();
        expect(screen.findByAltText("Delete")).not.toBeNull();
        expect(screen.getByText(/title/i)).toBeInTheDocument();
        expect(screen.getByText(/description/i)).toBeInTheDocument();
    });


})

