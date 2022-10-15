import React from "react";
import { mount, shallow } from "enzyme";
import TaskDetail from "./Task-Detail";
import { generateID } from "../../../utils";

let mockTask = {
  id: generateID(),
  title: "Test Task",
  description: "Test Description",
};

describe("TaskDetail", () => {
  let wrapper, container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    wrapper = shallow(
      <TaskDetail
        task={mockTask}
        onModalSave={() => {}}
        onModalClose={() => {}}
      />
    );
  });

  afterEach(() => {
    document.body.removeChild(container);

    container = null;
    wrapper = null;
    jest.clearAllMocks();
  });

  it("renders without crash", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should render h2 element without crash", () => {
    expect(wrapper.find("h2")).toHaveLength(1);
  });
  it("should render h4 element without crash", () => {
    expect(wrapper.find("h4")).toHaveLength(1);
  });

  it("should validate text in h2 element", () => {
    let heading2 = wrapper.find("h2");
    expect(heading2.text()).toBe("Test Task");
  });
  it("should validate text in h4 element", () => {
    let heading4 = wrapper.find("h4");
    expect(heading4.text()).toBe("Description");
  });

  it("should render button element without crash", () => {
    expect(wrapper.find("button")).toHaveLength(3);
  });

  it("should find the text inside the first button element", () => {
    let button = wrapper.find("button");
    expect(button.at(0).text()).toBe("SAVE");
  });

  it("should find the text inside the second button element", () => {
    let button = wrapper.find("button");
    expect(button.at(1).text()).toBe("CLOSE");
  });
  it("should find the text inside the third button element", () => {
    let button = wrapper.find("button");
    expect(button.at(2).text()).toBe("Add Attachment");
  });
});
