export const initState = (objs) => {
    const newEntities = {};
    if (objs) {
        const ids = objs && objs.map(obj => obj.id)
        objs.forEach((obj, idx) => {
        newEntities[obj.id] = obj
        })
        return {
            ids: ids,
            entities: newEntities
        }
    }
    return null
}