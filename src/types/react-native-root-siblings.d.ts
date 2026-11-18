declare module 'react-native-root-siblings' {
  import { Component, ReactElement, ReactNode } from 'react';

  export interface RootSiblingsOptions {
    onUpdate?: () => void;
    onDestroy?: () => void;
  }

  export default class RootSiblings {
    /**
     * Create a new RootSibling instance
     * @param element - React element to render
     * @param callback - Optional callback after render
     * @param options - Optional configuration options
     */
    constructor(
      element: ReactElement | ((sibling: RootSiblings) => ReactElement),
      callback?: () => void,
      options?: RootSiblingsOptions,
    );

    /**
     * Update the content of the sibling
     * @param element - New React element to render
     * @param callback - Optional callback after update
     */
    update(
      element: ReactElement | ((sibling: RootSiblings) => ReactElement),
      callback?: () => void,
    ): void;

    /**
     * Destroy the sibling and remove it from the tree
     * @param callback - Optional callback after destruction
     */
    destroy(callback?: () => void): void;
  }

  /**
   * RootSiblingParent component that should wrap your app
   * to enable RootSiblings functionality
   */
  export class RootSiblingParent extends Component<{
    inactive?: boolean;
    children?: ReactNode;
  }> {}

  export function RootSiblingPortal(props: {
    children: ReactNode;
  }): null;
}
