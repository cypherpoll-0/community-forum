export default function Comment({ comment, canEdit, onDelete }: {
  comment: any
  canEdit: boolean
  onDelete: () => void
}) {
  return (
    <div className="border rounded p-3">
      <p>{comment.content}</p>
      <div className="text-xs text-gray-500 mt-1 flex justify-between">
        <span>By {comment.user.name}</span>
        <span>{new Date(comment.createdAt).toLocaleString()}</span>
      </div>

      {canEdit && (
        <div className="mt-1 text-xs text-right">
          <button onClick={onDelete} className="text-red-500">Delete</button>
        </div>
      )}
    </div>
  )
}
