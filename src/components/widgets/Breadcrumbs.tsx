import { Breadcrumbs, Anchor, Box, Flex } from '@mantine/core';
import { CaretRightIcon, HomeIcon } from '@radix-ui/react-icons';

type IBreadCrumbsProps = {
  crumb: string
}

export const BreadCrumbs = ({ crumb }: IBreadCrumbsProps) => {
  const items = [
    { title: 'Home', href: '/', icon: <HomeIcon /> },
    { title: crumb, href: '#' },
  ].map((item, index) => (
    <Anchor href={item?.href} key={index} size='12' className="last:text-gray-600">
      <Flex
        align="center"
        gap={5}
      >
        {item?.icon} {item.title}
      </Flex>
    </Anchor>
  ));
  
  return (
    <Box className="mx-auto md:ml-auto md:mr-0">
      <Breadcrumbs separator={<CaretRightIcon />} separatorMargin={3} mt="xs">{items}</Breadcrumbs>
    </Box>
  )
}