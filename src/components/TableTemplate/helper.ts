export const DeepClone = <TModel>(obj: TModel): TModel => {
  if (Array.isArray(obj)) {
    return obj.map(DeepClone) as TModel
  } else if (typeof obj === 'object' && obj) {
    return Object.keys(obj).reduce((a, b) => {
      a[b] = DeepClone((obj as any)[b] as any)
      return a
    }, {} as any)
  } else {
    return obj
  }
}
