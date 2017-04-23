# @datagica/incremental-merge

*An incremental merge*

Update a JSON's field if the new data has more information. If the new data has
less information (less entropy) the previous value will be used instead, so if
you want to delete fields use `Object.assign` or Lodash's `_.merge` instead.
