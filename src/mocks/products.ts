import { ProductProps } from 'src/constants/types/product';

// export const productsFake: ProductProps[] = [
//   {
//     id: '1',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-123',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Apples',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '3',
//     description: 'Fresh organic apples from local farms',
//   },
//   {
//     id: '222',
//     category: 'Food 2',
//     brand: 'Acme',
//     code: 'ACME-123',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Apples',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '100',
//     description: 'Fresh organic apples from local farms',
//   },
//   {
//     id: '2123',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-124',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Bananas',
//     salePrice: '2900000',
//     costPrice: '1500000',
//     availableItem: '50',
//     description: 'Fresh organic bananas from local farms',
//   },
//   {
//     id: '3d12',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-125',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Carrots',
//     salePrice: '2300000',
//     costPrice: '2300500',
//     availableItem: '75',
//     description: 'Fresh organic carrots from local farms',
//   },
//   {
//     id: '4d21',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-126',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Orange Juice',
//     salePrice: '30005000',
//     costPrice: '30005000',
//     availableItem: '25',
//     description: 'Fresh organic orange juice from local farms',
//   },
//   {
//     id: '5',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-127',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Green Tea',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '50',
//     description: 'Fresh organic green tea from local farms',
//   },
//   {
//     id: '6',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-128',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Coffee',
//     salePrice: '40005000',
//     costPrice: '2900000',
//     availableItem: '30',
//     description: 'Fresh organic coffee from local farms',
//   },
//   {
//     id: '7',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-129',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Tomatoes',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '60',
//     description: 'Fresh organic tomatoes from local farms',
//   },
//   {
//     id: '8',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-130',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Lettuce',
//     salePrice: '2900000',
//     costPrice: '10005000',
//     availableItem: '80',
//     description: 'Fresh organic lettuce from local farms',
//   },
//   {
//     id: '9',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-131',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Broccoli',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '40',
//     description: 'Fresh organic broccoli from local farms',
//   },
//   {
//     id: '10',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-132',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Lemonade',
//     salePrice: '51005000',
//     costPrice: '35005000',
//     availableItem: '20',
//     description: 'Fresh organic lemonade from local farms',
//   },
//   {
//     id: '1222',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-123',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Apples',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '100',
//     description: 'Fresh organic apples from local farms',
//   },
//   {
//     id: '2s22',
//     category: 'Food 2',
//     brand: 'Acme',
//     code: 'ACME-123',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Apples',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '100',
//     description: 'Fresh organic apples from local farms',
//   },
//   {
//     id: 'd22',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-124',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Bananas',
//     salePrice: '2900000',
//     costPrice: '1500000',
//     availableItem: '50',
//     description: 'Fresh organic bananas from local farms',
//   },
//   {
//     id: '335ads',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-125',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Carrots',
//     salePrice: '2300000',
//     costPrice: '2300500',
//     availableItem: '75',
//     description: 'Fresh organic carrots from local farms',
//   },
//   {
//     id: '4ewtwe',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-126',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Orange Juice',
//     salePrice: '30005000',
//     costPrice: '30005000',
//     availableItem: '25',
//     description: 'Fresh organic orange juice from local farms',
//   },
//   {
//     id: '1rye',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-123',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Apples',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '100',
//     description: 'Fresh organic apples from local farms',
//   },
//   {
//     id: '22eew2',
//     category: 'Food 2',
//     brand: 'Acme',
//     code: 'ACME-123',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Apples',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '100',
//     description: 'Fresh organic apples from local farms',
//   },
//   {
//     id: '2werc',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-124',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Bananas',
//     salePrice: '2900000',
//     costPrice: '1500000',
//     availableItem: '50',
//     description: 'Fresh organic bananas from local farms',
//   },
//   {
//     id: '3dsfa',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-125',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Carrots',
//     salePrice: '2300000',
//     costPrice: '2300500',
//     availableItem: '75',
//     description: 'Fresh organic carrots from local farms',
//   },
//   {
//     id: '4asdfas',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-126',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Orange Juice',
//     salePrice: '30005000',
//     costPrice: '30005000',
//     availableItem: '25',
//     description: 'Fresh organic orange juice from local farms',
//   },
//   {
//     id: '5cafewf',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-127',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Green Tea',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '50',
//     description: 'Fresh organic green tea from local farms',
//   },
//   {
//     id: '6fafwefc',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-128',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Coffee',
//     salePrice: '40005000',
//     costPrice: '2900000',
//     availableItem: '30',
//     description: 'Fresh organic coffee from local farms',
//   },
//   {
//     id: '7cerxaew',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-129',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Tomatoes',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '60',
//     description: 'Fresh organic tomatoes from local farms',
//   },
//   {
//     id: '8egvasd',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-130',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Lettuce',
//     salePrice: '2900000',
//     costPrice: '10005000',
//     availableItem: '80',
//     description: 'Fresh organic lettuce from local farms',
//   },
//   {
//     id: '96u3tegb',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-131',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Broccoli',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '40',
//     description: 'Fresh organic broccoli from local farms',
//   },
//   {
//     id: '3tga10',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-132',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Lemonade',
//     salePrice: '51005000',
//     costPrice: '35005000',
//     availableItem: '20',
//     description: 'Fresh organic lemonade from local farms',
//   },
//   {
//     id: '123gvc',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-123',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Apples',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '100',
//     description: 'Fresh organic apples from local farms',
//   },
//   {
//     id: '22hgfd2',
//     category: 'Food 2',
//     brand: 'Acme',
//     code: 'ACME-123',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Apples',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '100',
//     description: 'Fresh organic apples from local farms',
//   },
//   {
//     id: 'edc2',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-124',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Bananas',
//     salePrice: '2900000',
//     costPrice: '1500000',
//     availableItem: '50',
//     description: 'Fresh organic bananas from local farms',
//   },
//   {
//     id: '33efc',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-125',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Carrots',
//     salePrice: '2300000',
//     costPrice: '2300500',
//     availableItem: '75',
//     description: 'Fresh organic carrots from local farms',
//   },
//   {
//     id: 'wewdddf4',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-126',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Orange Juice',
//     salePrice: '30005000',
//     costPrice: '30005000',
//     availableItem: '25',
//     description: 'Fresh organic orange juice from local farms',
//   },

//   {
//     id: '13rd',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-123',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Apples',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '100',
//     description: 'Fresh organic apples from local farms',
//   },
//   {
//     id: '234rd22',
//     category: 'Food 2',
//     brand: 'Acme',
//     code: 'ACME-123',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Apples',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '100',
//     description: 'Fresh organic apples from local farms',
//   },
//   {
//     id: '23rgvdfg2',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-124',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Bananas',
//     salePrice: '2900000',
//     costPrice: '1500000',
//     availableItem: '50',
//     description: 'Fresh organic bananas from local farms',
//   },
//   {
//     id: '54rfc3',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-125',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Carrots',
//     salePrice: '2300000',
//     costPrice: '2300500',
//     availableItem: '75',
//     description: 'Fresh organic carrots from local farms',
//   },
//   {
//     id: '4tgfd',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-126',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Orange Juice',
//     salePrice: '30005000',
//     costPrice: '30005000',
//     availableItem: '25',
//     description: 'Fresh organic orange juice from local farms',
//   },
//   {
//     id: '5rcg',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-127',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Green Tea',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '50',
//     description: 'Fresh organic green tea from local farms',
//   },
//   {
//     id: '63rg',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-128',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Coffee',
//     salePrice: '40005000',
//     costPrice: '2900000',
//     availableItem: '30',
//     description: 'Fresh organic coffee from local farms',
//   },
//   {
//     id: 'tredf7',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-129',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Tomatoes',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '60',
//     description: 'Fresh organic tomatoes from local farms',
//   },
//   {
//     id: '8rgfdd',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-130',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Lettuce',
//     salePrice: '2900000',
//     costPrice: '10005000',
//     availableItem: '80',
//     description: 'Fresh organic lettuce from local farms',
//   },
//   {
//     id: '93rf',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-131',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Broccoli',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '40',
//     description: 'Fresh organic broccoli from local farms',
//   },
//   {
//     id: '1fc0',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-132',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Lemonade',
//     salePrice: '51005000',
//     costPrice: '35005000',
//     availableItem: '20',
//     description: 'Fresh organic lemonade from local farms',
//   },
//   {
//     id: '1sdg',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-123',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Apples',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '100',
//     description: 'Fresh organic apples from local farms',
//   },
//   {
//     id: '23ed22',
//     category: 'Food 2',
//     brand: 'Acme',
//     code: 'ACME-123',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Apples',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '100',
//     description: 'Fresh organic apples from local farms',
//   },
//   {
//     id: 'srgvd2',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-124',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Bananas',
//     salePrice: '2900000',
//     costPrice: '1500000',
//     availableItem: '50',
//     description: 'Fresh organic bananas from local farms',
//   },
//   {
//     id: '3sgsd',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-125',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Carrots',
//     salePrice: '2300000',
//     costPrice: '2300500',
//     availableItem: '75',
//     description: 'Fresh organic carrots from local farms',
//   },
//   {
//     id: '4ygfsc',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-126',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Orange Juice',
//     salePrice: '30005000',
//     costPrice: '30005000',
//     availableItem: '25',
//     description: 'Fresh organic orange juice from local farms',
//   },
//   {
//     id: '23rgvdfg1232',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-124',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Bananas',
//     salePrice: '2900000',
//     costPrice: '1500000',
//     availableItem: '50',
//     description: 'Fresh organic bananas from local farms',
//   },
//   {
//     id: '54123rfc3',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-125',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Carrots',
//     salePrice: '2300000',
//     costPrice: '2300500',
//     availableItem: '75',
//     description: 'Fresh organic carrots from local farms',
//   },
//   {
//     id: '4tgasdfd',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-126',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Orange Juice',
//     salePrice: '30005000',
//     costPrice: '30005000',
//     availableItem: '25',
//     description: 'Fresh organic orange juice from local farms',
//   },
//   {
//     id: '5r12wccg',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-127',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Green Tea',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '50',
//     description: 'Fresh organic green tea from local farms',
//   },
//   {
//     id: '62wdxa3rg',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-128',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Coffee',
//     salePrice: '40005000',
//     costPrice: '2900000',
//     availableItem: '30',
//     description: 'Fresh organic coffee from local farms',
//   },
//   {
//     id: 'tre112wdsdf7',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-129',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Tomatoes',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '60',
//     description: 'Fresh organic tomatoes from local farms',
//   },
//   {
//     id: '8rgasd1fdd',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-130',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Lettuce',
//     salePrice: '2900000',
//     costPrice: '10005000',
//     availableItem: '80',
//     description: 'Fresh organic lettuce from local farms',
//   },
//   {
//     id: '93asdasrf',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-131',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Broccoli',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '40',
//     description: 'Fresh organic broccoli from local farms',
//   },
//   {
//     id: '1fca11c0',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-132',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Lemonade',
//     salePrice: '51005000',
//     costPrice: '35005000',
//     availableItem: '20',
//     description: 'Fresh organic lemonade from local farms',
//   },
//   {
//     id: '1s1esaddg',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-123',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Apples',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '100',
//     description: 'Fresh organic apples from local farms',
//   },
//   {
//     id: '23easdxad22',
//     category: 'Food 2',
//     brand: 'Acme',
//     code: 'ACME-123',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Apples',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '100',
//     description: 'Fresh organic apples from local farms',
//   },
//   {
//     id: 'srg1asdavd2',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-124',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Bananas',
//     salePrice: '2900000',
//     costPrice: '1500000',
//     availableItem: '50',
//     description: 'Fresh organic bananas from local farms',
//   },
//   {
//     id: '3sgsdfsfd',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-125',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Carrots',
//     salePrice: '2300000',
//     costPrice: '2300500',
//     availableItem: '75',
//     description: 'Fresh organic carrots from local farms',
//   },
//   {
//     id: '4yasasccgfsc',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-126',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Orange Juice',
//     salePrice: '30005000',
//     costPrice: '30005000',
//     availableItem: '25',
//     description: 'Fresh organic orange juice from local farms',
//   },
//   {
//     id: '23rgsasasvdfg2',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-124',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Bananas',
//     salePrice: '2900000',
//     costPrice: '1500000',
//     availableItem: '50',
//     description: 'Fresh organic bananas from local farms',
//   },
//   {
//     id: '54rfdqec3',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-125',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Carrots',
//     salePrice: '2300000',
//     costPrice: '2300500',
//     availableItem: '75',
//     description: 'Fresh organic carrots from local farms',
//   },
//   {
//     id: '4tgfasd',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-126',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Orange Juice',
//     salePrice: '30005000',
//     costPrice: '30005000',
//     availableItem: '25',
//     description: 'Fresh organic orange juice from local farms',
//   },
//   {
//     id: 'asdsw5rcg',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-127',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Green Tea',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '50',
//     description: 'Fresh organic green tea from local farms',
//   },
//   {
//     id: '2wdda63rg',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-128',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Coffee',
//     salePrice: '40005000',
//     costPrice: '2900000',
//     availableItem: '30',
//     description: 'Fresh organic coffee from local farms',
//   },
//   {
//     id: 'tre1fadf7',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-129',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Tomatoes',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '60',
//     description: 'Fresh organic tomatoes from local farms',
//   },
//   {
//     id: '8d2dqrgfdd',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-130',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Lettuce',
//     salePrice: '2900000',
//     costPrice: '10005000',
//     availableItem: '80',
//     description: 'Fresh organic lettuce from local farms',
//   },
//   {
//     id: '93asdarf',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-131',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Broccoli',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '40',
//     description: 'Fresh organic broccoli from local farms',
//   },
//   {
//     id: '12wsfc0',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-132',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Lemonade',
//     salePrice: '51005000',
//     costPrice: '35005000',
//     availableItem: '20',
//     description: 'Fresh organic lemonade from local farms',
//   },
//   {
//     id: '112wfcsdg',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-123',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Apples',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '100',
//     description: 'Fresh organic apples from local farms',
//   },
//   {
//     id: '231qaed22',
//     category: 'Food 2',
//     brand: 'Acme',
//     code: 'ACME-123',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Apples',
//     salePrice: '30005000',
//     costPrice: '2900000',
//     availableItem: '100',
//     description: 'Fresh organic apples from local farms',
//   },
//   {
//     id: 'sr12dagvd2',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-124',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Bananas',
//     salePrice: '2900000',
//     costPrice: '1500000',
//     availableItem: '50',
//     description: 'Fresh organic bananas from local farms',
//   },
//   {
//     id: '3sasdgsd',
//     category: 'Food',
//     brand: 'Acme',
//     code: 'ACME-125',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Carrots',
//     salePrice: '2300000',
//     costPrice: '2300500',
//     availableItem: '75',
//     description: 'Fresh organic carrots from local farms',
//   },
//   {
//     id: '4y1111gfsc',
//     category: 'Drink',
//     brand: 'Acme',
//     code: 'ACME-126',
//     thumbnail: 'https://via.placeholder.com/150x150',
//     name: 'Organic Orange Juice',
//     salePrice: '30005000',
//     costPrice: '30005000',
//     availableItem: '25',
//     description: 'Fresh organic orange juice from local farms',
//   },
// ];
