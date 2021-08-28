import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import globeFill from '@iconify/icons-eva/globe-2-fill';
import square from '@iconify/icons-eva/plus-square-outline';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  // {
  //   title: 'profile',
  //   path: '/dashboard/profile',
  //   icon: getIcon(pieChart2Fill)
  // },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'explore',
    path: '/dashboard/explore',
    icon: getIcon(globeFill)
  },
  {
    title: 'users',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Create Post',
    path: '/dashboard/createpost',
    icon: getIcon(square)
  },
  
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // },
  
  // {
  //   title: 'your mum',
  //   path: '/dashboard/yourmum',
  //   icon: getIcon(lockFill)
  // }
];

export default sidebarConfig;
