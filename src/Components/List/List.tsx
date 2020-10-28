export const List = ({data, renderItem}: {data: any, renderItem: (item: any) => any}) => {
    const _renderList = () => {
        return data.map((item: any) => renderItem(item));
    }
    return _renderList();
}
