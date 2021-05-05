export interface ContextMenu {
  items: ContextMenuItem[];
}

export interface ContextMenuItem {
  name: string;
  icon: string;
  action: ContextMenuAction;
}

export interface ContextMenuAction {
  type: string;
  payload: any;
}
