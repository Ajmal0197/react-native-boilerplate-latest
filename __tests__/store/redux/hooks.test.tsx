import React from 'react';
import { Text, Button, View } from 'react-native';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { addProduct, clearProducts } from '@features/home/store/homeSlice';
import { useAppDispatch, useAppSelector } from '@store/redux/hooks';
import { createTestStore } from '@store/redux/store';

const TestReduxConsumer = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.home.products);

  return (
    <View>
      <Text testID="product-count">{products.length.toString()}</Text>
      {products.map(p => (
        <Text key={p.id} testID={`item-${p.id}`}>
          {p.title}
        </Text>
      ))}
      <Button
        title="Add Item"
        onPress={() =>
          dispatch(
            addProduct({
              id: 'test-item-1',
              title: 'Added Product',
              price: 10,
              category: 'Test',
              description: 'Desc',
            }),
          )
        }
      />
      <Button title="Clear All" onPress={() => dispatch(clearProducts())} />
    </View>
  );
};

describe('Redux custom hooks (useAppDispatch, useAppSelector)', () => {
  it('reads state with useAppSelector and dispatches with useAppDispatch', async () => {
    const testStore = createTestStore();
    await render(
      <Provider store={testStore}>
        <TestReduxConsumer />
      </Provider>,
    );

    const initialCount = testStore.getState().home.products.length;
    expect(screen.getByTestId('product-count')).toHaveTextContent(
      initialCount.toString(),
    );

    // Dispatch clear via hook
    await fireEvent.press(screen.getByText('Clear All'));
    await waitFor(() => {
      expect(screen.getByTestId('product-count')).toHaveTextContent('0');
    });
    expect(testStore.getState().home.products).toHaveLength(0);

    // Dispatch add via hook
    await fireEvent.press(screen.getByText('Add Item'));
    await waitFor(() => {
      expect(screen.getByTestId('product-count')).toHaveTextContent('1');
    });
    expect(screen.getByTestId('item-test-item-1')).toHaveTextContent(
      'Added Product',
    );
    expect(testStore.getState().home.products[0].id).toBe('test-item-1');
  });
});
