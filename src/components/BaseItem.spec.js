import { shallowMount } from '@vue/test-utils'
import BaseItem from './BaseItem'

const setup = (props = {}, options = {}) => {
  const wrapper = shallowMount(BaseItem, {
    propsData: {
      title: 'Lorem',
      subtitle: 'Ipsum',
      ...props
    },
    ...options
  })

  return wrapper;
}

describe('BaseItem', () => {
  describe('with an image', () => {
    const wrapper = setup({
      img: 'dog.jpg'
    });

    const title = wrapper.find('[data-test="title"]')
    const subtitle = wrapper.find('[data-test="subtitle"]')
    const img = wrapper.find('[data-test="img"]')

    it('Renders title', () => {
      expect(title.text()).toBe('Lorem');
    });

    it('Renders subtitle', () => {
      expect(subtitle.text()).toBe('Ipsum');
    });

    it('Renders image with proper src', () => {
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toBe('dog.jpg');
    });
  });

  describe('without an image', () => {
    const wrapper = setup();

    const title = wrapper.find('[data-test="title"]')
    const subtitle = wrapper.find('[data-test="subtitle"]')
    const img = wrapper.find('[data-test="img"]')

    it('Renders title', () => {
      expect(title.text()).toBe('Lorem');
    });

    it('Renders subtitle', () => {
      expect(subtitle.text()).toBe('Ipsum');
    });

    it('Does not render image', () => {
      expect(img.exists()).toBe(false);
    });
  });

  it('Renders default slot', () => {
    const wrapper = setup({}, {
      slots: {
        default: '<span>Hello there</span>'
      }
    })

    // const content = wrapper.find('[data-test="content"]');

    // expect(content.exists()).toBe(true);
    // expect(content.element.innerHTML).toBe('<span>Hello there</span>');
    expect(wrapper.html()).toContain('<span>Hello there</span>');
  });
});
