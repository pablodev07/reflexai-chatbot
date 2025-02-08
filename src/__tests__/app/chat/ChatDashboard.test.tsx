import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ChatDashboard from "@/app/chat/page";


jest.useFakeTimers();

describe("ChatDashboard", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test("should display a bot response after an user sends a message", async () => {
    render(<ChatDashboard />);

    const input = screen.getByTestId("user-input");

    await act(async () => {
      userEvent.type(input, "Hello");
      userEvent.click(screen.getByTestId("send-msg"));
    });

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
        console.log(screen.debug());
      expect(
        screen.getByText("Hello! I am here to help you. What's troubling you today?")
      ).toBeInTheDocument();
    });

    const messages = screen.getAllByTestId("message-container");
    expect(messages).toHaveLength(2);
    expect(messages[1].textContent).toBe(
      "Hello! I am here to help you. What's troubling you today?"
    );
  });
});