import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import OptIn from './OptIn';
import TopImage from './optin/TopImage';
import CashValue from './optin/CashValue';
import Timer from './optin/Timer';
import Button from './optin/Button';

jest.mock('axios');

describe('OptIn component', () => {
  const props = {
    cash: '$20',
    buttonText: 'Submit',
    buttonUrl: 'http://example.com',
  };

  const optinData = {
    content: {
      cash: '$50',
      timer: {
        hours: 1,
        minutes: 30,
        seconds: 0,
      },
      button: {
        url: 'http://example2.com',
        text: 'Join now!',
      },
    },
  };

  it('renders loading message while data is being fetched', () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));
    const wrapper = mount(<OptIn {...props} />);
    expect(wrapper.text()).toBe('Loading...');
  });

  it('renders error message if there is an error fetching data', () => {
    const errorMessage = '404 Not Found';
    axios.get.mockImplementationOnce(() =>
      Promise.reject({ response: { status: errorMessage } })
    );
    const wrapper = mount(<OptIn {...props} />);
    expect(wrapper.text()).toBe(`Error: ${errorMessage}`);
  });

  it('renders OptIn component if data is fetched successfully', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: optinData })
    );
    const wrapper = mount(<OptIn {...props} />);
    await Promise.resolve();
    wrapper.update();
    expect(wrapper.find('.opt-in')).toHaveLength(1);
    expect(wrapper.find(TopImage)).toHaveLength(1);
    expect(wrapper.find(CashValue)).toHaveLength(1);
    expect(wrapper.find(Timer)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(CashValue).props().cash).toBe(optinData.content.cash);
    expect(wrapper.find(Timer).props().hours).toBe(
      optinData.content.timer.hours
    );
    expect(wrapper.find(Timer).props().minutes).toBe(
      optinData.content.timer.minutes
    );
    expect(wrapper.find(Timer).props().seconds).toBe(
      optinData.content.timer.seconds
    );
    expect(wrapper.find(Button).props().url).toBe(optinData.content.button.url);
    expect(wrapper.find(Button).props().text).toBe(
      optinData.content.button.text
    );
  });

  it('renders CashValue with default cash prop if optin data does not have cash', async () => {
    const optinDataWithoutCash = {
      content: {
        timer: {
          hours: 1,
          minutes: 30,
          seconds: 0,
        },
        button: {
          url: 'http://example2.com',
          text: 'Join now!',
        },
      },
    };
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: optinDataWithoutCash })
    );
    const wrapper = mount(<OptIn {...props} />);
    await Promise.resolve();
    wrapper.update();
    expect(wrapper.find(CashValue).props().cash).toBe(props.cash);
  });

  it('renders Button with default text and url props if optin data does not have button', async () => {
    const optinDataWithoutButton = {
      content: {
        cash: '$50',
        timer: {
          hours: 1,
          minutes: 30,
          seconds: 0,
        },
      },
    };
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: optinDataWithoutButton })
    );
    const wrapper = mount(<OptIn {...props} />);
    await Promise.resolve();
    wrapper.update();
    expect(wrapper.find(Button).props().text).toBe(props.buttonText);
    expect(wrapper.find(Button).props().url).toBe(props.buttonUrl);
  });
});
