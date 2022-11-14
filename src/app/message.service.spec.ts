import { MessageService } from "./message.service";

describe("MessageService", () => {
  let messageService: MessageService;

  it("should have empty list at start", () => {
    // Arrange
    messageService = new MessageService();

    // Act
    // Assert
    expect(messageService.messages.length).toBe(0);
  });

  it("should increase the length when one message is added", () => {
    // Arrange
    messageService = new MessageService();

    // Act
    messageService.add("hbd");

    // Assert
    expect(messageService.messages.length).toBe(1);
  });

  it("should empty the list when clear is called", () => {
    // Arrange
    messageService = new MessageService();
    messageService.add("hbd");

    // Act
    messageService.clear();

    // Assert
    expect(messageService.messages.length).toBe(0);
  });
});
