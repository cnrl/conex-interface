import { useGetComponents } from '@api/components';
import { shortcuts } from '@components/constants/shortcuts';
import { useStateToggleShortcutOn } from '@hooks/use-shortcut';
import { Typography } from '@mui/material';
import { mainCmdk } from '@stores/app-states';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import CommandPalette, { filterItems, getItemIndex } from 'react-cmdk';
import 'react-cmdk/dist/cmdk.css';

type Pages = 'components' | 'projects' | 'about-us';

export const MainCommandPalette = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState<Pages>('components');
  const { open } = mainCmdk.useStore();
  useStateToggleShortcutOn(shortcuts.commandPalette, mainCmdk.setOpen);
  const { isPending, error, data } = useGetComponents();

  useEffect(() => {
    if (open) setPage('components');
  }, [open]);

  const filteredItems = filterItems(
    [
      {
        heading: 'Components',
        id: 'components',
        items:
          isPending || error
            ? []
            : produce(data, draft => {
                if (!draft) return;
                draft.forEach(item => {
                  const page = item['data-goto'] as Pages;
                  if (page) {
                    item.onClick = () => setPage(page);
                  }
                });
              }),
      },
      {
        heading: 'team',
        id: 'team',
        items: [
          {
            id: 'about-us',
            children: 'About us',
            icon: 'UserIcon',
            closeOnSelect: false,
            onClick: () => setPage('about-us'),
          },
        ],
      },
    ],
    search,
  );

  return (
    <CommandPalette
      isOpen={open}
      page={page}
      search={search}
      onChangeOpen={mainCmdk.setOpen}
      onChangeSearch={setSearch}
    >
      <CommandPalette.Page id="components">
        {filteredItems.length ? (
          filteredItems.map(list => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem key={id} index={getItemIndex(filteredItems, id)} {...rest} />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>

      <CommandPalette.Page id="about-us">
        <Typography sx={{ color: 'white' }}>todo: About Us</Typography>
      </CommandPalette.Page>
      <CommandPalette.Page id="projects">
        <Typography sx={{ color: 'white' }}>todo: Projects</Typography>
      </CommandPalette.Page>
    </CommandPalette>
  );
};
