'use client';

import { DataTable } from '@/components/ui/data-table/data-table';
import type { pageResponse, Post, PostContextType } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { createContext, useCallback, useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { getPosts } from '@/apis';

export const PostContext = createContext<PostContextType | undefined>(
  undefined,
);

export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategory] = useState('Toon');
  const [order, setOrder] = useState('');

  const [curPage, setCurPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    took: 0,
    total: 0,
    totalPage: 0,
    setCurPage,
  });

  const handleGetPosts = useCallback(async () => {
    const query = {
      category,
      order,
      page: curPage || 1,
    };
    const { list, page, took, total, totalPage }: pageResponse<Post> =
      await getPosts(query);
    console.log('Posts data', list);
    setPosts(list);

    setPageInfo({
      page,
      took,
      total,
      totalPage,
      setCurPage,
    });
  }, [category, order, curPage]);

  const columns: ColumnDef<Post>[] = [
    {
      accessorKey: 'index',
      header: '번호',
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="게시글 제목" />
      ),
    },
    {
      accessorKey: 'author',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="게시글 작성자" />
      ),
    },
    {
      accessorKey: 'likes',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="좋아요 수" />
      ),
    },
    {
      accessorKey: 'comments',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="댓글 수" />
      ),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="작성일" />
      ),
    },
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  useEffect(() => {
    if (category) void handleGetPosts();
  }, [category, handleGetPosts]);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <PostContext.Provider
          value={{
            handleGetPosts,
            category,
            setCategory,
            setOrder,
          }}
        >
          {category === 'Toon' ? (
            <DataTable
              type="toon"
              columns={columns}
              data={posts}
              pageInfo={pageInfo}
            />
          ) : category === 'Challenge' ? (
            <DataTable
              type="challenge"
              columns={columns}
              data={[]}
              pageInfo={pageInfo}
            />
          ) : category === 'Question' ? (
            <DataTable
              type="question"
              columns={columns}
              data={[]}
              pageInfo={pageInfo}
            />
          ) : null}
        </PostContext.Provider>
      </div>
    </>
  );
};
