import React from "react";
import { mount, shallow } from "enzyme";
import Card from "./Card";
import { generateID } from "../../utils";

let mockDetails = {
  id: generateID(),
  title: "TO - DO",
  tasks: [
    {
      title: "test",
    },
  ],
};

describe("Card", () => {
  let wrapper, container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    wrapper = shallow(
      <Card
        key="1"
        index="0"
        preventDelete={true}
        details={mockDetails}
        onDelete={() => {}}
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

  it("should render input element without crash", () => {
    expect(wrapper.find("input")).toHaveLength(2);
  });

  it("should render button element without crash", () => {
    expect(wrapper.find("button")).toHaveLength(2);
  });

  it("should find the text inside the first button element", () => {
    let button = wrapper.find("button");
    expect(button.at(0).text()).toBe("+");
  });

  it("should find the text inside the second button element", () => {
    let button = wrapper.find("button");
    expect(button.at(1).text()).toBe("Delete");
  });
});
