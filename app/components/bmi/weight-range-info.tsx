interface WeightRangeInfoProps {
  range: {
    min: number
    max: number
  }
  currentWeight: number
}

export function WeightRangeInfo({ range, currentWeight }: WeightRangeInfoProps) {
  const difference = currentWeight > range.max 
    ? currentWeight - range.max 
    : currentWeight < range.min 
      ? range.min - currentWeight 
      : 0

  return (
    <div className="mt-6 p-4 bg-slate-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Healthy Weight Range</h3>
      <p className="text-muted-foreground">
        For your height, a healthy weight range is between{' '}
        <span className="font-medium text-foreground">{range.min}</span> and{' '}
        <span className="font-medium text-foreground">{range.max}</span> pounds.
      </p>
      {difference > 0 && (
        <p className="mt-2 text-muted-foreground">
          You are {currentWeight > range.max ? 'above' : 'below'} this range by{' '}
          <span className="font-medium text-foreground">{Math.round(difference)}</span> pounds.
        </p>
      )}
    </div>
  )
} 