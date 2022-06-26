import testFragments from "./testFragments.json"
import {SvgFeatureFragmentsBuilderService} from "../svg-feature-fragments-builder-service";

describe('Fragment Builder Service', () => {
    const service: SvgFeatureFragmentsBuilderService = new SvgFeatureFragmentsBuilderService()

    it('returns no layer groups if there are no grouped elements in the SVG', async () => {

        const svgString = testFragments.emptySVG
        const result = await service.getFeatureFragmentsFromSVGString(svgString)
        expect(result.length).toEqual(0)
        expect(result).toEqual([])
    })

    it('returns a single layer as a feature with the inkscape label as name', async () => {
        const svgString = testFragments.singleGroupSVG
        const result = await service.getFeatureFragmentsFromSVGString(svgString)
        expect(result.length).toEqual(1)
        expect(result).toContainEqual({featureName: "props", orderNumber: 0, characteristics: []})
    })

    it('returns fragments for each sublayer of a feature', async () => {

        const svgString = testFragments.singleGroupWithElementSVG
        const result = await service.getFeatureFragmentsFromSVGString(svgString)
        expect(result.length).toEqual(1)
        expect(result).toContainEqual({
            featureName: "props",
            orderNumber: 0,
            characteristics: [expect.objectContaining({name: "props-glasses"})]
        })
    })

})