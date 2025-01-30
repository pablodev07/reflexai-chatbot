import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatDashboard from "@/app/chat/page";


describe("ChatDashboard", () => {
    test("should display a bot response after an user sends a message", async ()=> {
        render(<ChatDashboard/>)

        const input = screen.getByTestId("user-input");
        userEvent.type(input, "Hello");
        userEvent.click(screen.getByTestId("send-msg"));

        await waitFor(() => 
            screen.findByText("Hello! I am here to help you. What's troubling you today?"),
            { timeout: 5000}
        )
        const messages = screen.getAllByTestId("message-container");
        expect(messages).toHaveLength(2);
        expect(messages[1].textContent).toBe("Hello! I am here to help you. What's troubling you today?")
    })
})