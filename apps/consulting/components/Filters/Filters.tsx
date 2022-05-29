import { FC } from 'react';

import { useRouter } from 'next/router';

import { getFilterStartingValue } from '../../utils/getFiltersStartingValue/getFilterStartingValue';
import { FilterMenuVariant } from '../../utils/getFiltersStartingValue/types';
import { FilterMenu } from './FilterMenu/FilterMenu';
import { TFiltersProps } from './types';

export const Filters: FC<TFiltersProps> = ({
  postType,
  postTypes,
  setPostType,
  postCategory,
  postCategories,
  setPostCategory,
  setCurrentPage,
}) => {
  const router = useRouter();

  const handleCategoryFilter = (category: string): void => {
    const isTheSameCategory = category === postCategory;
    if (isTheSameCategory) return;
    setPostCategory(category);
    setCurrentPage(1);
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          page: 1,
          category:
            category === getFilterStartingValue(FilterMenuVariant.Categories)
              ? ''
              : category,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const handleTypeFilter = (type: string): void => {
    const isTheSameType = type === postType;
    if (isTheSameType) return;
    setPostType(type);
    setCurrentPage(1);
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          page: 1,
          type:
            type === getFilterStartingValue(FilterMenuVariant.Types)
              ? ''
              : type,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <div className="flex flex-col gap-[2rem] justify-between items-center pb-[5.2rem] w-full sm:flex-row sm:gap-[5rem]">
      <FilterMenu
        filterMenuVariant={FilterMenuVariant.Types}
        menuDataCurrent={postType}
        menuData={postTypes}
        handleFilter={handleTypeFilter}
      />
      <FilterMenu
        filterMenuVariant={FilterMenuVariant.Categories}
        menuDataCurrent={postCategory}
        menuData={postCategories}
        handleFilter={handleCategoryFilter}
      />
    </div>
  );
};
