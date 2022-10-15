import React from "react";
import { mount, shallow } from "enzyme";
import Board from "./Board";

describe("Board", () => {
  let wrapper, container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    wrapper = shallow(<Board></Board>);
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

  it("should render button without crash", () => {
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("should find the text inside the button element", () => {
    let button = wrapper.find("button");
    expect(button.text()).toBe("+");
  });
});
